const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const allowedTypes = ['personal', 'work', 'family', 'friend', 'other'];
  if (allowedTypes.includes(type)) return type;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
