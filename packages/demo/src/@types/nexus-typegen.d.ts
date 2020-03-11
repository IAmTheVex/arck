/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as ctx from "../Context"
import * as prismaClient from "@prisma/client"
import { core, connectionPluginCore } from "nexus"

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    connection<FieldName extends string>(
            fieldName: FieldName, 
            config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName> 
          ): void
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PostCreateInput: { // input type
    author?: NexusGenInputs['UserCreateOneWithoutPostsInput'] | null; // UserCreateOneWithoutPostsInput
    content?: string | null; // String
    post_id?: string | null; // String
    title: string; // String!
    view_count?: number | null; // Int
  }
  PostCreateManyWithoutAuthorInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'][] | null; // [PostWhereUniqueInput!]
    create?: NexusGenInputs['PostCreateWithoutAuthorInput'][] | null; // [PostCreateWithoutAuthorInput!]
  }
  PostCreateWithoutAuthorInput: { // input type
    content?: string | null; // String
    post_id?: string | null; // String
    title: string; // String!
    view_count?: number | null; // Int
  }
  PostWhereUniqueInput: { // input type
    post_id?: string | null; // String
  }
  ProfileCreateManyWithoutUserInput: { // input type
    connect?: NexusGenInputs['ProfileWhereUniqueInput'][] | null; // [ProfileWhereUniqueInput!]
    create?: NexusGenInputs['ProfileCreateWithoutUserInput'][] | null; // [ProfileCreateWithoutUserInput!]
  }
  ProfileCreateWithoutUserInput: { // input type
    bio?: string | null; // String
    profile_id?: string | null; // String
  }
  ProfileWhereUniqueInput: { // input type
    profile_id?: string | null; // String
  }
  UserCreateInput: { // input type
    email: string; // String!
    name?: string | null; // String
    posts?: NexusGenInputs['PostCreateManyWithoutAuthorInput'] | null; // PostCreateManyWithoutAuthorInput
    profiles?: NexusGenInputs['ProfileCreateManyWithoutUserInput'] | null; // ProfileCreateManyWithoutUserInput
    user_id?: string | null; // String
  }
  UserCreateOneWithoutPostsInput: { // input type
    connect?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
    create?: NexusGenInputs['UserCreateWithoutPostsInput'] | null; // UserCreateWithoutPostsInput
  }
  UserCreateWithoutPostsInput: { // input type
    email: string; // String!
    name?: string | null; // String
    profiles?: NexusGenInputs['ProfileCreateManyWithoutUserInput'] | null; // ProfileCreateManyWithoutUserInput
    user_id?: string | null; // String
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    user_id?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Post: prismaClient.Post;
  PostConnection: { // root type
    edges?: Array<NexusGenRootTypes['PostEdge'] | null> | null; // [PostEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  PostEdge: { // root type
    cursor: string; // String!
    node: NexusGenRootTypes['Post']; // Post!
  }
  Query: {};
  Subscription: {};
  Test: { // root type
    t: string; // String!
  }
  User: prismaClient.User;
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  PostCreateInput: NexusGenInputs['PostCreateInput'];
  PostCreateManyWithoutAuthorInput: NexusGenInputs['PostCreateManyWithoutAuthorInput'];
  PostCreateWithoutAuthorInput: NexusGenInputs['PostCreateWithoutAuthorInput'];
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  ProfileCreateManyWithoutUserInput: NexusGenInputs['ProfileCreateManyWithoutUserInput'];
  ProfileCreateWithoutUserInput: NexusGenInputs['ProfileCreateWithoutUserInput'];
  ProfileWhereUniqueInput: NexusGenInputs['ProfileWhereUniqueInput'];
  UserCreateInput: NexusGenInputs['UserCreateInput'];
  UserCreateOneWithoutPostsInput: NexusGenInputs['UserCreateOneWithoutPostsInput'];
  UserCreateWithoutPostsInput: NexusGenInputs['UserCreateWithoutPostsInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createOnePost: NexusGenRootTypes['Post']; // Post!
    createOneUser: NexusGenRootTypes['User']; // User!
    emitTest: NexusGenRootTypes['Test']; // Test!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    post_id: string; // String!
    title: string; // String!
  }
  PostConnection: { // field return type
    edges: Array<NexusGenRootTypes['PostEdge'] | null> | null; // [PostEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  PostEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Post']; // Post!
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Subscription: { // field return type
    test: NexusGenRootTypes['Test']; // Test!
  }
  Test: { // field return type
    t: string; // String!
  }
  User: { // field return type
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    postsConnection: NexusGenRootTypes['PostConnection']; // PostConnection!
    user_id: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createOnePost: { // args
      data: NexusGenInputs['PostCreateInput']; // PostCreateInput!
    }
    createOneUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
  }
  Query: {
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    users: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  User: {
    posts: { // args
      after?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      before?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    postsConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "PageInfo" | "Post" | "PostConnection" | "PostEdge" | "Query" | "Subscription" | "Test" | "User";

export type NexusGenInputNames = "PostCreateInput" | "PostCreateManyWithoutAuthorInput" | "PostCreateWithoutAuthorInput" | "PostWhereUniqueInput" | "ProfileCreateManyWithoutUserInput" | "ProfileCreateWithoutUserInput" | "ProfileWhereUniqueInput" | "UserCreateInput" | "UserCreateOneWithoutPostsInput" | "UserCreateWithoutPostsInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ctx.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginSchemaConfig {
  }
}