import { Box, Skeleton, SkeletonProps } from '@chakra-ui/react';
import React from 'react';

interface iCardSkeletonProps extends SkeletonProps {
  repeatCount: number;
}

export const CardSkeleton = ({
  repeatCount = 1,
  ...rest
}: iCardSkeletonProps) => {
  const howMany = Array.from(Array(repeatCount).keys());

  return (
    <>
      {howMany.map((_, index: number) => (
        <Skeleton
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          {...rest}
          speed={1}
          startColor='gray.100'
          endColor='gray.200'
        >
          <Box w='300px' h='190px' padding='7' />
        </Skeleton>
      ))}
    </>
  );
};
