import axios from "axios";
import { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} from "graphql";

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType },
    })
});

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: async (parent, args) => {
                const { data } = await axios.get("https://api.spacexdata.com/v3/launches");
                return data;
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve: async (parent, { flight_number }) => {
                const { data } = await axios.get(`https://api.spacexdata.com/v3/launches/${ flight_number }`);
                return data;
            }
        },
        rockets: {
            type: new GraphQLList(LaunchType),
            resolve: async (parent, args) => {
                const { data } = await axios.get("https://api.spacexdata.com/v3/rockets");
                return data;
            }
        },
        rocket: {
            type: LaunchType,
            args: {
                rocket_id: { type: GraphQLInt }
            },
            resolve: async (parent, { rocket_id }) => {
                const { data } = await axios.get(`https://api.spacexdata.com/v3/rockets/${ rocket_id }`);
                return data;
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});

