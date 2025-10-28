/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  query FetchPointsHistory($where: Points_activityhistoryFilter) {\n    points_activity_history(where: $where) {\n      list {\n        id\n        activityId\n        points\n        time\n      }\n      page\n      count\n      pageSize\n    }\n  }\n':
    types.FetchPointsHistoryDocument,
  '\n  query FetchPointsLeaderboard($where: Points_activityleaderboardFilter) {\n    points_activity_leaderboard(where: $where) {\n      overallRanks {\n        totalPoints\n        user\n        rank\n      }\n      currentUserRank {\n        totalPoints\n        rank\n      }\n    }\n  }\n':
    types.FetchPointsLeaderboardDocument,
  '\n  query FetchPointsUserSummary($where: Points_activityuserSummaryFilter) {\n    points_activity_userSummary(where: $where) {\n      activityId\n      activityName\n      invitePoints\n      lpPoints\n      swapPoints\n      totalPoints\n    }\n  }\n':
    types.FetchPointsUserSummaryDocument,
  '\n  query FetchBrandAnnouncementList($where: Brand_site_announcementqueryilter) {\n    brand_site_announcement_list(where: $where) {\n      list {\n        id\n        brand\n        lastPublishTime\n        sort\n        title\n        type\n        url\n        metadata {\n          background\n          buttonType\n          icon\n          theme\n        }\n      }\n      lastPublishId\n      lastPublishTime\n    }\n  }\n':
    types.FetchBrandAnnouncementListDocument,
  '\n  query FetchBrandSiteBannerList($where: Brand_site_bannerqueryilter) {\n    brand_site_banner_list(where: $where) {\n      id\n      title\n      describe\n      bannerImg\n      url\n    }\n  }\n':
    types.FetchBrandSiteBannerListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FetchPointsHistory($where: Points_activityhistoryFilter) {\n    points_activity_history(where: $where) {\n      list {\n        id\n        activityId\n        points\n        time\n      }\n      page\n      count\n      pageSize\n    }\n  }\n',
): typeof import('./graphql').FetchPointsHistoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FetchPointsLeaderboard($where: Points_activityleaderboardFilter) {\n    points_activity_leaderboard(where: $where) {\n      overallRanks {\n        totalPoints\n        user\n        rank\n      }\n      currentUserRank {\n        totalPoints\n        rank\n      }\n    }\n  }\n',
): typeof import('./graphql').FetchPointsLeaderboardDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FetchPointsUserSummary($where: Points_activityuserSummaryFilter) {\n    points_activity_userSummary(where: $where) {\n      activityId\n      activityName\n      invitePoints\n      lpPoints\n      swapPoints\n      totalPoints\n    }\n  }\n',
): typeof import('./graphql').FetchPointsUserSummaryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FetchBrandAnnouncementList($where: Brand_site_announcementqueryilter) {\n    brand_site_announcement_list(where: $where) {\n      list {\n        id\n        brand\n        lastPublishTime\n        sort\n        title\n        type\n        url\n        metadata {\n          background\n          buttonType\n          icon\n          theme\n        }\n      }\n      lastPublishId\n      lastPublishTime\n    }\n  }\n',
): typeof import('./graphql').FetchBrandAnnouncementListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query FetchBrandSiteBannerList($where: Brand_site_bannerqueryilter) {\n    brand_site_banner_list(where: $where) {\n      id\n      title\n      describe\n      bannerImg\n      url\n    }\n  }\n',
): typeof import('./graphql').FetchBrandSiteBannerListDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
