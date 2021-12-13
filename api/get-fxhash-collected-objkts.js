import {gql, request} from 'graphql-request';

// https://api.fxhash.xyz/graphiql
const query = gql`
    query Query($wallet: String!, $skip: Int!) {
        user(id: $wallet) {
            objkts(take: 50, skip: $skip) {
                id
                name
                metadataUri
                metadata
            }
        }
    }
`;

const getFxHashCollectedObjkts = async(wallet) => {
    try {
        const response = await request('https://api.fxhash.xyz/graphql',
            query, {wallet, skip: 0});
        return response.user.objkts;
    } catch(e) {
        console.log('Error fetching created objkts');
        return null;
    }
};

export default getFxHashCollectedObjkts;
