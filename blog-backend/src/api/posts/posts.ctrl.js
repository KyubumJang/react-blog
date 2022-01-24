import Post from '../../models/post';

export const write = async ctx => {
    const { title, body, tags } = ctx.request.body;
    const post = new Post({ title, body, tags });
    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e)
    }
};
export const list = async ctx => {
    try {
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch(e) {
        ctx.throw(500, e)
    }
};
export const read = async ctx => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();
        if(!post) {
            ctx.status = 404; // Not found
            return;
        }
        ctx.body = post
    } catch(e) {
        ctx.throw(500,e)
    }
};
export const remove = async ctx => {
    const {id} = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; // No Content (성공했지만 응답할 데이터 없음)
    } catch(e) {
        ctx.throw(500, e)
    }
};
export const update = async ctx => {
    const {id} = ctx.params;
    try {
        //이 값을 설정하면 업데이트 된 데이터 반환, false일 경우 업데이트 되기 전 데이터 반환)
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, { new: true }).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};