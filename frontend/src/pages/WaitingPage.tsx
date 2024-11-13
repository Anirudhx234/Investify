/* this page will be rendered outside of app router */
export default function WaitingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="text-5xl">Investify</span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    </div>
  );
}
