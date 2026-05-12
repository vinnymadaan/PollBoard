import { createPoll } from "../controllers/poll.controllers.js"; 
import { protect } from "../middleware/auth.middleware.js";
import router from "./auth.routes.js";
import { getMyPolls } from "../controllers/poll.controllers.js";
import { getPollById } from "../controllers/poll.controllers.js";
import { submitVote }from "../controllers/poll.controllers.js";
import { getPollAnalytics } from "../controllers/poll.controllers.js";
import { publishResults } from "../controllers/poll.controllers.js";
import { getDashboardData } from "../controllers/poll.controllers.js";


router.post(
  "/create",
  protect,
  createPoll
);

router.get(
  "/dashboard-data",
  protect,
  getDashboardData
);

router.get(
  "/my-polls",
  protect,
  getMyPolls
);


router.get(
  "/:id",
  getPollById
);

router.post(
  "/:id/vote",
  submitVote
);

router.get(
  "/:id/analytics",
  protect,
  getPollAnalytics
);

router.patch(
  "/:id/publish",
  protect,
  publishResults
);


export default router