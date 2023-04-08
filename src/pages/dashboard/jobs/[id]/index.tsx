import Head from "next/head";
import SidebarLayout from "@layouts/SidebarLayout";
import PageHeader from "@content/Dashboard/Jobs/PageHeader";
import PageTitleWrapper from "@components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";
import Footer from "@components/Footer";

import Job from "@content/Dashboard/Jobs/Job";
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import prisma from "@services/prisma";
import { getJobWithSignedUrls } from "@services/jobUtils";

function ApplicationsTransactions({
  job,
}: {
  job: Job & { coverage?: string; logs?: string };
}) {
  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader subtitle={`Job ${job.id}`} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Job job={job} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page: ReactElement) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: context.params?.id?.toString(),
    },
    include: {
      project: true,
    },
  });

  const jobWithLogs = await getJobWithSignedUrls(job);

  const coverage = jobWithLogs.coverageUrl
    ? await fetch(jobWithLogs.coverageUrl).then((res) => res.text())
    : undefined;
  const logs = jobWithLogs.logsUrl
    ? await fetch(jobWithLogs.logsUrl).then((res) => res.text())
    : undefined;

  return {
    props: {
      job: JSON.parse(
        JSON.stringify({
          ...jobWithLogs,
          logs,
          coverage,
        })
      ),
    },
  };
};

export default ApplicationsTransactions;
