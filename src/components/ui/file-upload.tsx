import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Image,
  X,
  CheckCircle,
  AlertCircle,
  File,
} from "lucide-react";

export interface UploadedFile {
  id: string;
  file: File;
  status: "uploading" | "success" | "error";
  preview?: string;
}

interface FileUploadProps {
  id: string;
  label: string;
  description?: string;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesChange: (files: UploadedFile[]) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  description,
  accept = ".pdf,.png,.jpg,.jpeg",
  maxFiles = 1,
  maxSize = 10,
  onFilesChange,
  className,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (file.type.startsWith("image/")) {
      return <Image className="h-8 w-8 text-blue-500" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const validateFile = (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const allowedTypes = accept.split(",").map((type) => type.trim());
    const isValidType = allowedTypes.some((type) => {
      if (type.startsWith(".")) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type === type;
    });

    if (!isValidType) {
      return "Invalid file type";
    }

    return null;
  };

  const processFiles = useCallback(
    (fileList: FileList) => {
      const newFiles: UploadedFile[] = [];

      Array.from(fileList).forEach((file) => {
        const validationError = validateFile(file);
        if (validationError) {
          // You could show a toast notification here
          return;
        }

        const fileId = generateFileId();
        const uploadedFile: UploadedFile = {
          id: fileId,
          file,
          status: "uploading",
        };

        // Create preview for images
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            uploadedFile.preview = e.target?.result as string;
            setFiles((prev) =>
              prev.map((f) => (f.id === fileId ? uploadedFile : f)),
            );
          };
          reader.readAsDataURL(file);
        }

        // Simulate upload process
        setTimeout(() => {
          uploadedFile.status = "success";
          setFiles((prev) =>
            prev.map((f) => (f.id === fileId ? uploadedFile : f)),
          );
        }, 1500);

        newFiles.push(uploadedFile);
      });

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
    [files, maxFiles, onFilesChange],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [processFiles],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        processFiles(selectedFiles);
      }
      // Reset input value to allow re-uploading the same file
      e.target.value = "";
    },
    [processFiles],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      const updatedFiles = files.filter((f) => f.id !== fileId);
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
    [files, onFilesChange],
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Upload Area */}
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-200 hover:border-primary/50",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          files.length === 0 ? "p-8" : "p-4",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {files.length === 0 ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop your auditing documents here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Or click to browse files
              </p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="outline" className="text-xs">
                PDF
              </Badge>
              <Badge variant="outline" className="text-xs">
                PNG
              </Badge>
              <Badge variant="outline" className="text-xs">
                JPG
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Max {maxFiles} file{maxFiles > 1 ? "s" : ""}, up to {maxSize}MB
              each
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-background rounded border flex items-center justify-center">
                      {getFileIcon(uploadedFile.file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {uploadedFile.status === "uploading" && (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                  {uploadedFile.status === "success" && (
                    <CheckCircle className="w-4 h-4 text-audit-success" />
                  )}
                  {uploadedFile.status === "error" && (
                    <AlertCircle className="w-4 h-4 text-audit-error" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}

            {files.length < maxFiles && (
              <div className="text-center py-2">
                <Button variant="outline" size="sm" className="relative">
                  <Upload className="h-4 w-4 mr-2" />
                  Add More Files
                  <input
                    type="file"
                    accept={accept}
                    multiple={maxFiles > 1}
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};
