const ButlerService = require('../../services/ButlerService');
const axios = require('axios');

let butlerService;
let body = {
    userId: 1,
    tdDl: '20-09-18',
    tdName: 'Do Homework',
}

let id;


describe("ButlerServce", () => {
    beforeEach(() => {
        butlerService = new ButlerService();
    })

    it("should call the add method", (done) => {
        butlerService.addTd(body)
            .then((data) => {
                id = Object.values(data.data).join();
                //id key should only be one object
                expect(Object.keys(data.data).length).toEqual(1);
                //id key name should be 'name'
                expect(Object.keys(data.data)).toEqual(['name']);
                //id key value should be exactly 20 characters long
                expect((Object.values(data.data)).join().length).toEqual(20)
            })
            .then(() => butlerService.deleteTd(id))
            .then(() => done());
    })

    it("should call the get method", (done) => {
        butlerService.addTd(body)
            // create a example todoList and return the ( todo_id ) to list method
            .then((data) => {
                id = Object.values(data.data).join();
                return butlerService.getTd(id)
            })
            .then((data) => {
                expect(Object.keys(data.data).length).toEqual(4);
                expect(data.data.user_id).toEqual(1);
                expect(data.data.todo_name).toEqual('Do Homework');
                expect(data.data.todo_deadline).toEqual('20-09-18');
            })
            //after testing should delete the todo list
            .then(() => butlerService.deleteTd(id))
            .then(() => done());
    });

    it("should call the patch method", (done) => {
        let updateBody = {
            tdDl: 'new deadline'
        }
        // create a example todoList and return the ( todo_id ) to list method
        butlerService.addTd(body)
            .then(data => {
                id = Object.values(data.data).join();
                //update the deadline using an object with the key tdDl
                return butlerService.updateTd(id, updateBody)
            })
            .then((data) =>
                expect((Object.values(data.data)).join()).toEqual('new deadline'))
            //after testing should delete the todo list
            .then(() => butlerService.deleteTd(id))
            .then(() => done());
    });

    it("should call the delete method", (done) => {
        butlerService.addTd(body)
            .then(({ data }) => 
                butlerService.deleteTd(Object.values(data).join()))
            .then(({ data }) => {
                expect(data).toEqual(null);
                done();
            });
    });


    it("should call the get all method", (done) => {
        butlerService.getAll()
            .then(({ data }) => {
                expect(Object.values(data).length).toEqual(4)
                done()
            });
    });

})