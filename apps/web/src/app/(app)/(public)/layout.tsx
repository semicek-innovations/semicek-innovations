export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-[1024px] flex-col px-6">{children}</div>
}
