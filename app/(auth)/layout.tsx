export default function Layout({children} : { children: React.ReactNode}) {
  return (
    <main className="h-full flex items-center justify-center bg-slate-100 overflow-y-auto p-4">
      {children}
    </main>
  );
}