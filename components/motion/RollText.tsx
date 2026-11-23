/** Teks yang berganti lewat roll-over vertikal saat link/tombol induknya di-hover. */
export default function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
