// Base horizontal offset for root tree items
export const BASE_PADDING = 10;

// Additional indentation per nesting level
export const LEVEL_PADDING = 14;

// Files don't render a disclosure chevron, so compensate for alignment
export const FILE_CHEVRON_OFFSET = 16;

export const getItemPadding = (level: number, isFile: boolean) => {
  return (
    BASE_PADDING + level * LEVEL_PADDING + (isFile ? FILE_CHEVRON_OFFSET : 0)
  );
};
