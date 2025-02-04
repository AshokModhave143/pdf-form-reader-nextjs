export type SideMenuNavItem = {
  label: string;
  icon?: React.ReactNode;
  description?: string;
  href?: string;
};

export interface FileData {
  label: string;
  fieldType: 'input' | 'radio' | 'checkbox' | 'dropdown' | 'text' | string;
  customLabel: string;
  value: string;
}

export interface FileDetails {
  fileName: string;
  fileType: string;
  fileRef: File | null;
  fileData: FileData[];
}
