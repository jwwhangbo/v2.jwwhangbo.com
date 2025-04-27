'use client';
import { Maybe } from 'graphql/jsutils/Maybe';
import React from 'react';
import styles from "./PostTemplate.module.css"
import Script from 'next/script';

const PostArea = ({content}: {content:Maybe<string>}) => {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize highlight.js after the script loads
          // @ts-ignore
          if (typeof window !== "undefined" && window.hljs) {
            // @ts-ignore
            window.hljs.highlightAll();
          }
        }}
      />
      <div
        className={styles.contentBody}
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    </>
  );
};

export default PostArea;