type BrandMarkProps = {
  compact?: boolean;
};

export default function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className={`brandmark ${compact ? "brandmark-compact" : ""}`}>
      <div className="brandmark-monogram" aria-hidden="true">
        <span>N</span>
        <span>S</span>
      </div>
      <div className="brandmark-copy">
        <strong>Nikita Surani</strong>
        <span>Full Stack Developer</span>
      </div>
    </div>
  );
}
