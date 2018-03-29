export enum GridTypes {
  None,
  Dots,
  Grid,
}

export const GridTypeValues = Object.keys(GridTypes).filter(k => !isNaN(Number(GridTypes[k])));

export const FontSizes = {
  'font9x18': { size: 18, adj: `translate(${ 0.01 - 1 },${ 0.21 - 1 })` },
  'font6x12': { size: 12, adj: `translate(${ 0 },${ -1.35 })` },
  'font10x20': { size: 20, adj: `translate(${ -1 },${ 0.2 })` },
  'font6x13O': { size: 13, adj: `translate(${ 0 },${ 0.4 }) scale(1.0015)` },
  'font4x6': { size: 6, adj: `translate(${ 0 },${ 0.8 }) scale(1.001)` },
  'font5x7': { size: 7, adj: `translate(${ 0 },${ 0.8 }) scale(1.0005)` },
  'font5x8': { size: 8, adj: `translate(${ 0 },${ 0.60 })` },
  'font6x10': { size: 10, adj: `translate(${ 0 },${ 0.6 })` },
};
