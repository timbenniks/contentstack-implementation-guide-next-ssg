import { getPage } from "@/lib/contentstack";
import { Page } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

type PageProps = {
  staticPropsPage: Page;
};

export async function getStaticProps() {
  const staticPropsPage = await getPage("/");

  return {
    props: { staticPropsPage },
  };
}

export default function Index({ staticPropsPage }: PageProps) {
  const [page, setPage] = useState<Page>(staticPropsPage);

  const getContent = async () => {
    const page = await getPage("/");
    setPage(page as Page);
  };

  useEffect(() => {
    ContentstackLivePreview.onLiveEdit(getContent);
  }, []);

  return (
    <main className="max-w-screen-2xl mx-auto">
      <section className="p-4">
        {page?.title ? (
          <h1
            className="text-4xl font-bold mb-4"
            {...(page?.$ && page?.$.title)}
          >
            {page?.title}
          </h1>
        ) : null}

        {page?.description ? (
          <p className="mb-4" {...(page?.$ && page?.$.description)}>
            {page?.description}
          </p>
        ) : null}

        {page?.image ? (
          <Image
            className="mb-4"
            width={300}
            height={300}
            src={page?.image.url}
            alt={page?.image.title}
            {...(page?.image?.$ && page?.image?.$.url)}
          />
        ) : null}

        {page?.rich_text ? (
          <div
            {...(page?.$ && page?.$.rich_text)}
            dangerouslySetInnerHTML={{ __html: page?.rich_text }}
          />
        ) : null}
      </section>
    </main>
  );
}
