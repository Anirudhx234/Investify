/* this page will be rendered outside of app router */
export default function LoadingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="text-5xl">Loading</span>
        <span className="loading-bars loading loading-lg"></span>
      </div>
    </div>
  );
}
