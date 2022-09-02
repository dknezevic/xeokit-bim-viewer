import {utils} from "@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";

/**
 * Default server client which loads content for a {@link BIMViewer} via HTTP from the file system.
 *
 * A BIMViewer is instantiated with an instance of this class.
 *
 * To load content from an alternative source, instantiate BIMViewer with your own custom implementation of this class.
 */
class RestServer {

    /**
     * Constructs a Server.
     *
     * @param {*} [cfg] Server configuration.
     * @param {String} [cfg.apiUrl] Base directory for content.
     */
    constructor(cfg = {}) {
        this._apiUrl = cfg.apiUrl || "";
    }

    /**
     * Gets information on all available projects.
     *
     * @param {Function} done Callback through which the JSON result is returned.
     * @param {Function} error Callback through which an error message is returned on error.
     */
    getProjects(done, error) {
        const url = this._apiUrl + "/projects";
        utils.loadJSON(url, done, error);
    }

    /**
     * Gets information for a project.
     *
     * @param {String} projectId ID of the project.
     * @param {Function} done Callback through which the JSON result is returned.
     * @param {Function} error Callback through which an error message is returned on error.
     */
    getProject(projectId, done, error) {
        const url = this._apiUrl + "/projects/" + projectId;
        utils.loadJSON(url, done, error);
    }

    /**
     * Gets metadata for a model within a project.
     *
     * @param {String} projectId ID of the project.
     * @param {String} modelId ID of the model.
     * @param {Function} done Callback through which the JSON result is returned.
     * @param {Function} error Callback through which an error message is returned on error.
     */
    getMetadata(projectId, modelId, done, error) {
        const url = this._apiUrl + "/projects/" + projectId + "/models/" + modelId + "/metadata";
        utils.loadJSON(url, done, error);
    }

    /**
     * Gets geometry for a model within a project.
     *
     * @param {String} projectId ID of the project.
     * @param {String} modelId ID of the model.
     * @param {Function} done Callback through which the JSON result is returned.
     * @param {Function} error Callback through which an error message is returned on error.
     */
    getGeometry(projectId, modelId, done, error) {
        const url = this._apiUrl + "/projects/" + projectId + "/models/" + modelId + "/geometry";
        utils.loadArraybuffer(url, done, error);
    }

    /**
     * Gets metadata for an object within a model within a project.
     *
     * @param {String} projectId ID of the project.
     * @param {String} modelId ID of the model.
     * @param {String} objectId ID of the object.
     * @param {Function} done Callback through which the JSON result is returned.
     * @param {Function} error Callback through which an error message is returned on error.
     */
    getObjectInfo(projectId, modelId, objectId, done, error) {
        const url = this._apiUrl + "/projects/" + projectId + "/models/" + modelId + "/props/" + objectId;
        utils.loadJSON(url, done, error);
    }

    /**
     * Gets existing issues for a model within a project.
     *
     * @param {String} projectId ID of the project.
     * @param {String} modelId ID of the model.
     * @param {Function} done Callback through which the JSON result is returned.
     * @param {Function} error Callback through which an error message is returned on error.
     */
    getIssues(projectId, modelId, done, error) {
        const url = this._apiUrl + "/projects/" + projectId + "/models/" + modelId + "/issues";
        utils.loadJSON(url, done, error);
    }
}

export {RestServer};