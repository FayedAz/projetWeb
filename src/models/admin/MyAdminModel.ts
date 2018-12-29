export interface MyAdminModel {
    /**
     * Ajoute un article au modèle à partir des informations
     * passées en paramètre. Une exception est levée si 
     * l'article ne peut pas être ajoutée.
     * 
     * @param data Données décrivant l'article à ajouter (voir ArticleData)
     * @returns Une promesse d'avoir l'identifiant de l'article créée
     */
    addArticle(userId: any, data : any): Promise<any>;

    /**
     * Archive un article. Une Exception est levée si
     * l'article ne peut pas être supprimé
     * 
     * @param data Données contenant l'identitfiant de l'article à archiver
     *              (Voir DeleteArticleData)
     * 
     */
    archiveArticle(data : any): Promise<void>;

    /**
     * Supprime un article. Une Exception est levée si
     * l'article ne peut pas être supprimé
     * 
     * @param data Données contenant l'identitfiant de l'article à supprimer
     *              (Voir DeleteArticleData)
     * 
     */
    deleteArticle(data : any): Promise<void>;


    /**
     * Annule l'archivage d'un article. Une Exception est levée si
     * on ne peut l'annuler
     * 
     * @param data Données contenant l'identitfiant de l'article à annuler la suppression
     *              (Voir DeleteArticleData)
     * 
     */
    cancelBoughtArticle(data: any) : Promise<void>;
}