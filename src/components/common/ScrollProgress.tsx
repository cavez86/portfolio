/** How far down the page the reader is: a red pencil line along the top edge. */
const ScrollProgress = () => (
  <div
    aria-hidden="true"
    className="animate-scale-x animation-timeline-scroll fixed top-0 left-0 z-60 h-[3px] w-full origin-top-left bg-red-pencil"
  />
);

export default ScrollProgress;
