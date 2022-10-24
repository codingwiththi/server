import Fastify from "fastify";

const server = Fastify({ logger: true });

server.get("/healthcheck", async () => {
    return { status: "ok" };
});

async function main() {
    try {
        await server.listen({ port: 3000 });
        console.log(`Server listening on http://localhost:3000`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
