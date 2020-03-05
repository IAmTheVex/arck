export interface TypesProvider {
    buildTypes(): any[] | Promise<any[]>
}