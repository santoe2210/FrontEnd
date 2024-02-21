import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({ children }) {
  return (
    <div>
      <div>{children} </div>
      <Toaster />
    </div>
  );
}
