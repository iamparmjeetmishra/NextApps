import { contract } from "@/contract";
import { implement } from "@orpc/server";
import { BaseContext } from "./middleware";
import {
  createTutorial,
  deleteTutorial,
  getBySlug,
  listTutorials,
  updateTutorial,
} from "./tutorial";

const os = implement(contract).$context<BaseContext>();

export const router = os.router({
  tutorial: {
    create: createTutorial,
    delete: deleteTutorial,
    update: updateTutorial,
    getBySlug: getBySlug,
    list: listTutorials,
  },
});
