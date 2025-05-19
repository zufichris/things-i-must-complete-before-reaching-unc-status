import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Notfound() {
  return (
    <div className="py-4 mx-auto">
      <Alert>
        <AlertTitle>404</AlertTitle>
        <AlertDescription>Page Not Found</AlertDescription>
      </Alert>
    </div>
  );
}
