import * as _ from 'lodash';

interface TreeByProperties<I> {
  [property: string]: TreeByProperties<I> | I[];
}

type ChunksByProperties<I> = I[][];

export class CollectionHelper {

  static treeByProperties<I>(collection: I[], properties: string[]): TreeByProperties<I> {
    return processCollection(collection, properties).tree;
  }

  static chunksByProperties<I>(collection: I[], properties: string[]): ChunksByProperties<I> {
    return processCollection(collection, properties).chunks;
  }

  static uniqueValues<I>(collection: I[], property: string): any[] {
    const values = [];

    _.forEach(collection, item => {
      if (values.indexOf(item[property]) === -1) {
        values.push(item[property]);
      }
    });

    return values;
  }

  static filterGroup<I>(collection: I[], propertyToGroup: string, condition: (item: I) => number | boolean): { [property: string]: I[] } {
    const values = {};

    _(collection)
      .groupBy(item => item[propertyToGroup])
      .forEach((items, key) => {
        if (items.some(condition)) {
          values[key] = items;
        }
      });

    return values;
  }

}

function processCollection<I>(collection: I[], properties: string[]): { tree: TreeByProperties<I>, chunks: ChunksByProperties<I> } {
  const tree: TreeByProperties<I> = {};
  const chunks: ChunksByProperties<I> = [];
  const lastPropertyIndex = properties.length - 1;

  _.forEach(collection, item => {
    let branch: TreeByProperties<I> | I[] = tree;

    _.forEach(properties, (property, index) => {
      if (branch[item[property]]) {
        branch = branch[item[property]];
      } else {
        if (index === lastPropertyIndex) {
          branch = branch[item[property]] = [];
          chunks.push(branch);
        } else {
          branch = branch[item[property]] = {};
        }
      }
    });

    if (Array.isArray(branch)) {
      branch.push(item);
    }
  });

  return { tree, chunks };
}
