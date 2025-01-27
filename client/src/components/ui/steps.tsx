import { Box, Steps as ChakraSteps } from "@chakra-ui/react";
import * as React from "react";
import { LuCheck } from "react-icons/lu";

interface StepInfoProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepsItemProps
  extends Omit<ChakraSteps.ItemProps, "title">,
    StepInfoProps {
  completedIcon?: React.ReactNode;
  icon?: React.ReactNode;
}

export const StepsItem = React.forwardRef<HTMLDivElement, StepsItemProps>(
  function StepsItem(props, ref) {
    const { title, description, completedIcon, icon, ...rest } = props;
    return (
      <ChakraSteps.Item {...rest} ref={ref} alignItems={"start"}>
        <ChakraSteps.Trigger
          pos={"relative"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          disabled
        >
          <ChakraSteps.Indicator>
            <ChakraSteps.Status
              complete={completedIcon || <LuCheck />}
              incomplete={icon || <ChakraSteps.Number />}
            />
          </ChakraSteps.Indicator>
          <StepInfo title={title} description={description} />
        </ChakraSteps.Trigger>
        <ChakraSteps.Separator mt={4} />
      </ChakraSteps.Item>
    );
  }
);

const StepInfo = (props: StepInfoProps) => {
  const { title, description } = props;

  const custom = {
    // pos: "absolute",
    // top: "100%",
    // left: "0%",
  };

  if (title && description) {
    return (
      <Box>
        <ChakraSteps.Title {...custom}>{title}</ChakraSteps.Title>
        <ChakraSteps.Description {...custom}>
          {description}
        </ChakraSteps.Description>
      </Box>
    );
  }

  return (
    <>
      {title && <ChakraSteps.Title {...custom}>{title}</ChakraSteps.Title>}
      {description && (
        <ChakraSteps.Description {...custom}>
          {description}
        </ChakraSteps.Description>
      )}
    </>
  );
};

interface StepsIndicatorProps {
  completedIcon: React.ReactNode;
  icon?: React.ReactNode;
}

export const StepsIndicator = React.forwardRef<
  HTMLDivElement,
  StepsIndicatorProps
>(function StepsIndicator(props, ref) {
  const { icon = <ChakraSteps.Number />, completedIcon } = props;
  return (
    <ChakraSteps.Indicator ref={ref}>
      <ChakraSteps.Status complete={completedIcon} incomplete={icon} />
    </ChakraSteps.Indicator>
  );
});

export const StepsList = ChakraSteps.List;
export const StepsRoot = ChakraSteps.Root;
export const StepsContent = ChakraSteps.Content;
export const StepsCompletedContent = ChakraSteps.CompletedContent;

export const StepsNextTrigger = ChakraSteps.NextTrigger;
export const StepsPrevTrigger = ChakraSteps.PrevTrigger;
