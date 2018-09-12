const ButlerRouter = require('../../routers/ButlerRouter');

//re-create fake variables
let butlerRouter;
let butlerService;
let req;
let res;
//fake data
let tdList = [{
    td_id: 1,
    user_id: 1,
    td_name: 'Do Homework',
    td_deadline: '21-12-21',
    created_time: Date()
}, {
    td_id: 2,
    user_id: 2,
    td_name: 'Apply to Set Sail',
    td_deadline: '20-09-18',
    created_time: Date()
}, {
    td_id: 3,
    user_id: 3,
    td_name: 'Run 10k',
    td_deadline: '01-01-21',
    created_time: Date()
}];

//start of test
describe("ButlerRouter", () => {
    //before each test, create the spy object that butlerRouter will call
    beforeEach(() => {
        butlerService = jasmine.createSpyObj("butlerService", {
            addTd: Promise.resolve({
                data: [1]
            }),
            getTd: Promise.resolve({
                data: tdList
            }),
            updateTd: Promise.resolve({
                data: tdList
            }),
            deleteTd: Promise.resolve(),
            getAll: Promise.resolve({
                data: tdList
            }),
        });

        butlerRouter = new ButlerRouter(butlerService);
        butlerRouter.router();
        req = jasmine.createSpyObj('req', ['params', 'query', 'body']);
        res = jasmine.createSpyObj('res', ['json']);
    });

    it("should start the router", () => {
        butlerRouter.router();
    });

    it("should send a post request", (done) => {
        butlerRouter.add(req, res).then(() => {
            expect(res.json).toHaveBeenCalledWith([1]);
            done();
        });
    });

    it("should send a get request", (done) => {
        butlerRouter.read(req, res).then(() => {
            expect(res.json).toHaveBeenCalledWith(tdList);
            done()
        });
    });

    it("should send a patch request", (done) => {
        butlerRouter.change(req, res).then(() => {
            expect(res.json).toHaveBeenCalledWith(tdList);
            done();
        });
    });

    it("should send a delete request", (done) => {
        butlerRouter.remove(req, res).then(() => {
            expect(res.json).toHaveBeenCalledWith(('Delete Successful'));
            done();
        });
    });

    it("should send a get all request and filter by user_id", (done) => {
        butlerRouter.readAll(req, res).then(() => {
            expect(res.json).toHaveBeenCalledWith([]);
            done();
        });
    });

});