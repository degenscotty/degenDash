import { AppLayout } from "@/components/AppLayout";

export function App() {
  return (
    <AppLayout>
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome to DegenDash</h2>
        <p className="text-muted-foreground">
          Your content will go here. The sidebar can be toggled with the button
          in the header or with Cmd/Ctrl + B.
        </p>
      </div>
    </AppLayout>
  );
}

export default App;
