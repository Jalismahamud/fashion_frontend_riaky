
import { cn } from "@/lib/utils";

const CommonSectionTitle = ({ text = "", className }) => {
  return (
    <h3
      className={cn(
        "xl:text-4xl lg:text-3xl 2xs:text-2xl text-[22px] font-semibold text-center text-primary-dark xs:pt-0",
        className
      )}
    >
      {text}
    </h3>
  );
};

export default CommonSectionTitle;
