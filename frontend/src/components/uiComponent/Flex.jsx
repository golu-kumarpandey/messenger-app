// Base Generic Component
export const Flex = ({
  direction,
  items,
  justify,
  gaps,
  mode,
  className = "",
  children,
}) => {
  return (
    <div
      className={`flex ${direction} ${items} ${justify} ${gaps} ${mode} ${className}`}
    >
      {children}
    </div>
  );
};

// 1. Row Center (Horizontal center)
export const RowCenter = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-center"
      justify="justify-center"
      gaps="gap-4"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

// 2. Row Between (Space between items)
export const RowBetween = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-center"
      justify="justify-between"
      gaps="gap-4"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

// 3. Column Center (Vertical center)
export const ColCenter = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-col"
      items="items-center"
      justify="justify-center"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

// 4. Row Start (Left aligned)
export const RowStart = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-start"
      justify="justify-start"
      gaps="gap-2"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

// 5. Row End (Right aligned)
export const RowEnd = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-center"
      justify="justify-end"
      gaps="gap-1"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

// 6. Space Around
export const RowSpaceAround = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-center"
      justify="justify-around"
      gaps="gap-4"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

// 7. Space Evenly
export const RowSpaceEvenly = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-center"
      justify="justify-evenly"
      gaps="gap-4"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

// 8. Column with different alignment
export const ColStart = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-col"
      items="items-start"
      justify="justify-start"
      gaps="gap-2"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

export const ColEnd = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-col"
      items="items-end"
      justify="justify-start"
      gaps={2}
      className={className}
    >
      {children}
    </Flex>
  );
};

// 9. Wrap Row
export const RowWrap = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-center"
      justify="justify-start"
      gaps="gap-4"
      mode="flex-wrap"
      className={className}
    >
      {children}
    </Flex>
  );
};

export const RowGap = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-row"
      items="items-center"
      justify="justify-start"
      gaps="gap-2"
      mode=""
      className={className}
    >
      {children}
    </Flex>
  );
};

export const ColGap = ({ children, className = "" }) => {
  return (
    <Flex
      direction="flex-col"
      justify="justify-start"
      itemss="items-start"
      gaps="gap-2"
      className={className}
    >
      {children}
    </Flex>
  );
};
