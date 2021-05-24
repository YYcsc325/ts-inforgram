export function getDragComponent(type: any) {
  try {
    const component = require(`@/components/DragComponents/${type}`).default;
    return component;
  } catch (err) {
    return () => null;
  }
}
