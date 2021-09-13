import { useMessages } from 'next-multilingual/messages';
import type { ReactElement } from 'react';
import Layout from '@/layout';
import styles from './index.module.css';
import { NextPageContext } from 'next';

export default function AboutUs({ testText }: testProps): ReactElement {
  const messages = useMessages();
  return (
    <Layout title={messages.format('pageTitle')}>
      <h1 className={styles.headline}>{messages.format('pageTitle')}</h1>
      <p>{messages.format('details')}</p>
      <p>{testText}</p>
    </Layout>
  );
}

export type testProps = {
  testText: string;
};

export async function getServerSideProps(
  nextPageContext: NextPageContext
): Promise<{ props: testProps }> {
  console.log('getServerSideProps on about-us');

  try {
    return {
      props: {
        testText: 'getServerSideProps test on about-us'
      }
    };
  } catch (error) {
    console.dir(error);
  }
}
