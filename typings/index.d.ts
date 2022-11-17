/**
 * ProjectName: tank-game
 * FilePath: \typings\index.d.ts
 * Created Date: Thursday, February 28th 2019, 1:50:09 pm
 * @author: liaodh
 * @summary: short description for the file
 * -----
 * Last Modified: Sunday, March 17th 2019, 10:14:51 pm
 * Modified By: liaodh
 * -----
 * Copyright (c) 2019 liaodh
 */


interface Promise<T> {
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}