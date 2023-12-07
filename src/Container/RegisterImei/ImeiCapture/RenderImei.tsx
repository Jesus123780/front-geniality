import { KeyboardEvent } from 'react'

interface IRenderImei {
  code: string;
  preview: string;
  selected: boolean;
  onSelected: (imei: { code: string; preview: string }) => void;
}
export const RenderImei = ({
  code,
  preview,
  selected,
  onSelected,
}: IRenderImei) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      onSelected({ code, preview });
    }
  };
  return (
    <li
      role='button'
      className={`imei-captured ${selected ? 'imei-captured--selected' : ''}`}
      tabIndex={0}
      onKeyPress={handleKeyPress}
      onClick={() =>
        onSelected({
          code,
          preview,
        })
      }
    >
      <img src={preview} alt='' />
      <div style={{ fontSize: '16px', textShadow: '2px 2px 2px rgba(0.5)' }}>
        {code}
      </div>
    </li>
  );
};
