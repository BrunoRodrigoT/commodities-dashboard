function isClientSide() {
  try {
    return typeof window !== 'undefined';
  } catch {
    return false;
  }
}

export default isClientSide;
