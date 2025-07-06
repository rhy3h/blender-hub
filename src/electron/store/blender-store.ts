import ElectronStore, { Schema } from 'electron-store';

interface IBlenderStore {
  lastUpdateDate: string;
  infos: Array<BlenderInfo>;
}

const schema: Schema<IBlenderStore> = {
  lastUpdateDate: {
    type: 'string',
    default: '',
  },
  infos: {
    type: 'array',
    default: [],
    items: {
      type: 'object',
      properties: {
        version: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        ext: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
        modifiedDate: {
          type: 'string',
        },
        size: {
          type: 'string',
        },
        os: {
          type: 'string',
        },
        arch: {
          type: 'string',
        },
      },
    },
  },
};

export class BlenderStore {
  private store: ElectronStore<IBlenderStore>;

  constructor() {
    this.store = new ElectronStore({
      name: 'Blender',
      schema,
      clearInvalidConfig: true,
    });
  }

  get(): IBlenderStore {
    const lastUpdateDate = this.store.get('lastUpdateDate');
    const infos = this.store.get('infos');
    return { lastUpdateDate, infos };
  }

  set(infos: Array<BlenderInfo>) {
    this.store.set('lastUpdateDate', new Date().toISOString());
    this.store.set('infos', infos);
  }
}
