import React from "react";
import ReactDOMServer from "react-dom/server";
import ReactTooltip from "react-tooltip";

type Props = React.PropsWithChildren<{
  place: string;
  multiline?: boolean;
  html?: boolean;
  backgroundColor?: string;
  offset?: string;
  content: JSX.Element;
  event?: string;
  eventOff?: string;
  className?: string;
  tooltipId?: string;
}>;

const Tooltip: React.FunctionComponent<Props> = ({
  place,
  multiline = true,
  html = true,
  backgroundColor = "#454545",
  offset,
  content,
  event,
  eventOff,
  tooltipId,
  children,
  className
}: Props) => (
  <div>
    <div
      data-for={tooltipId}
      data-class={className}
      data-place={place}
      data-multiline={multiline}
      data-html={html}
      data-background-color={backgroundColor}
      data-offset={offset}
      data-tip={ReactDOMServer.renderToStaticMarkup(content)}
      data-event={event}
      data-event-off={eventOff}
    >
      {children}
    </div>
    <ReactTooltip
      id={tooltipId || ""}
      globalEventOff="click"
      arrowColor="transparent"
      effect="solid"
      delayHide={1000}
      clickable
    />
  </div>
);

export default Tooltip;
