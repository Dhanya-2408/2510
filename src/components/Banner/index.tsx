import { FC } from "react";
import "./Style.scss";

interface IProps {
  url: string;
  title: string;
}

export const SplitBanner: FC<IProps> = (props: IProps) => {
  const { url, title } = props;

  return (
    <section className="HomeHero" data-aos="zoom-in-up">
      <div className="HomeHero__Image">
        <img className="image" sizes="100vw" src={url} alt={title} />
        <h2 className="Heading">{title}</h2>
      </div>
      <div className="HomeHero__SkeletonLoader"></div>
    </section>
  );
};
