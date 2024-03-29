import { io, Socket } from 'socket.io-client';
import { Task } from '../interfaces/common';
import { config } from '../config/config';

class SocketService {
    private socket: Socket;

    constructor(private serverUrl: string = config.socketUrl) {
        this.socket = io(this.serverUrl);
        this.initSocketEvents();
    }

    private initSocketEvents() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        this.socket.on('taskAdded', (task:Task) => {
            console.log('new task added', task);
        });

        this.socket.on('taskRemoved', (task:Task) => {
            console.log('Task removed');
        });
        this.socket.on('taskMoved', (task:Task) => {
            console.log('Task moved', task);
        });

        this.socket.on('taskEdited', (task:Task) => {
            console.log('Task edited');
        });

    }

    public taskAdded(task: Task) {
        this.socket.emit('taskAdded', task);
    }

    public taskRemoved(task: Task) {
        this.socket.emit('taskRemoved', task);
    }

    public taskMoved(task: Task) {
        this.socket.emit('taskMoved', task);
    }

    public taskEdited(task: Task) {
        this.socket.emit('taskEdited', task);
    }  

}

export default SocketService;
