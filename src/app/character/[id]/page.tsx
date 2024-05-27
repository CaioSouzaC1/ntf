"use client";
import Layout from "@/_layouts";
import Container from "@/components/container";

export default function CharacterPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <Container>
        <div>My character id: {params.id}</div>
      </Container>
    </Layout>
  );
}