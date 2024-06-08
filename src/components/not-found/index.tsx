import Layout from "@/_layouts";
import Container from "../container";
import { Heading } from "../ui/heading";

export default function NotFound({ title }: { title: string }) {
  return (
    <Layout>
      <Container>
        <Heading className="mt-16 mb-8 flex justify-center text-2xl lg:text-4xl items-center">
          Error, {title} not found
        </Heading>
        <p className="max-w-lg font-normal mb-16">
          Check that you typed the address correctly, go back to your previous
          page or try using our site search to find something specific.
        </p>
      </Container>
    </Layout>
  );
}
