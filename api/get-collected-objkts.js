import {gql, request} from 'graphql-request';
import {wallets} from '../constants.js';

const query = gql`
    query GetCollectedObjkts($wallets: [String!]) {
        hic_et_nunc_token(
            where: {
                creator_id: {_nin: $wallets}
                token_holders: {
                    quantity: {_gt: "0"},
                    holder_id: {_in: $wallets}
                }
            },
            order_by: {id: desc}
        ) {
            id
            title
            artifact_uri
            display_uri
            metadata
        }
    }
`;

const getCollectedObjkts = async() => {
    try {
        const response = await request('https://api.hicdex.com/v1/graphql',
            query, {wallets});
        return response.hic_et_nunc_token;
    } catch(e) {
        console.log(e);
        return null;
    }
};

export default getCollectedObjkts;
