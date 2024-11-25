interface StationLayoutProps {
  children: React.ReactNode;
}

export default function StationLayout({ children }: StationLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="w-full max-w-screen-sm mx-auto flex-1">{children}</main>
    </div>
  );
}
