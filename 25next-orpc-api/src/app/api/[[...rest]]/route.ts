import { router } from "@/router";
import { onError } from "@orpc/server";
import { SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
const schemaConverters = [new ZodToJsonSchemaConverter()];

const handler = new OpenAPIHandler(router, {
  plugins: [
    new CORSPlugin(),
    new SmartCoercionPlugin({ schemaConverters }),
    new OpenAPIReferencePlugin({
      schemaConverters,
      specGenerateOptions: {
        info: {
          title: "Tutorial API",
          version: "1.1.1",
          description:
            "Prouction grade tutorial API Build with ORPC and Next.js",
        },
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
      },
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

async function handleRequest(request: Request) {
  const { response } = await handler.handle(request, {
    prefix: "/api",
    context: { headers: request.headers },
  });
  return (
    response ?? new Response("Not Found", { status: 404 })
  );
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
