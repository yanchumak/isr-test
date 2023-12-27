import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CommentIcon, IssueIcon } from '../components/icons';
import { fetchGitHub, readAccessToken } from '../lib/github';
import { useRouter } from 'next/router'
import {GetStaticPropsContext} from "next";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');



export async function getStaticProps() {

  const issues = [{
    comments: 1,
    id: 1111,
    created_at: new Date().getMilliseconds(),
    number: 1,
    user: {
      login: "login"
    }
  }];

  console.log(`===========Index getStaticProps ${new Date().toLocaleDateString()} env ${JSON.stringify(publicRuntimeConfig.MY_VAR)}`);


  if (publicRuntimeConfig.MY_VAR==='false') {
    console.log("`````````````NOT_FOUND");
    return {
      notFound: true,
    }





  }

  return {
    props: {
      issues,
      stargazers_count: 1,
      forks_count: 1,
    },
    revalidate: false,
  };


}


export default function Home({ issues, stargazers_count, forks_count }: any) {
  return (
    <Layout
      homepage={true}
      forks_count={forks_count}
      stargazers_count={stargazers_count}
    >
      <div className={styles.issues}>
        {issues.map((issue: any) => (
          <Link key={issue.number} href={`/${issue.number}`}>
            <a className={styles.issue}>
              <IssueIcon />
              <div>
                <div className={styles.issue_title}>{issue.title}</div>
                <div className={styles.issue_desc}>
                  #{issue.number} opened{' '}
                  {timeAgo.format(new Date(issue.created_at))} by{' '}
                  {issue.user.login}
                </div>
              </div>
              {issue.comments > 0 && (
                <div className={styles.comment_count}>
                  <CommentIcon /> {new Number(issue.comments).toLocaleString()}
                </div>
              )}
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
