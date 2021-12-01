<template>
  <div class="inventory-breadcrumbs">
    <BreadcrumbList
      v-if="mq({ $from: 'tablet' })"
      :small="small"
      :items="items"
      @navigate="navigateBreadcrumb"
    />
    <div class="inventory-breadcrumbs-mobile d-flex align-items-center" v-else>
      <Button type="icon" icon="arrow-back" @click="goBack" />
      <h1 v-if="items.length > 0">{{ items[items.length - 1].title }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { BreadcrumbList, IBreadcrumb } from '@/components/Navigation';
import { Button } from '@/components/Buttons';

@Component({
  components: {
    BreadcrumbList,
    Button
  }
})
export default class InventoryBreadcrumbs extends Vue {
  @Prop() folders!: IInventory[];

  @Prop({ default: true }) small!: boolean;

  @Prop({ default: 1 }) rootLevel!: number;

  @Prop({ default: 1 }) folderLevel!: number;

  @Prop({ default: '' }) rootTitle!: string;

  @Emit('navigate')
  navigate(payload: IBreadcrumb) {
    return payload;
  }

  navigateBreadcrumb({
    $event,
    navigate,
    payload
  }: {
    $event: Event;
    navigate: Function;
    payload: IBreadcrumb;
  }) {
    $event.preventDefault();
    this.navigate(payload);
  }

  goBack() {
    if (this.items.length < 2) return false;
    const item = this.items[this.items.length - 2];
    this.navigate(item);
  }

  get items(): IBreadcrumb[] {
    const items: any[] = [];
    if (this.folders.length == 0) {
      return items;
    }
    if (this.folderLevel == this.rootLevel) {
      const folder = this.folders.find(
        (i: any) => i.parentFolderId == this.rootLevel
      );
    } else {
      const currentFolder = this.folders.find(
        (i: any) => i.id == this.folderLevel
      );
      items.push(currentFolder);
      const rootLevel = this.rootLevel;
      let parentLevel = currentFolder?.parentId;
      let i = this.folders.length;
      while (rootLevel != parentLevel) {
        if (i === 0) {
          break;
        }
        i = i - 1;
        const folder = this.folders.find((i: any) => i.id == parentLevel);
        if (folder) {
          items.unshift(folder);
          parentLevel = folder.parentId;
        } else {
          parentLevel = this.rootLevel;
        }
      }
    }
    let crumbs = items.map((i: IInventory) => {
      return { link: i.id.toString(), title: i.name, active: false };
    });
    crumbs = [
      ...[
        {
          link: this.rootLevel.toString(),
          title: this.rootTitle,
          active: false
        }
      ],
      ...crumbs
    ];
    crumbs[crumbs.length - 1].active = true;
    return crumbs;
  }
}
</script>
