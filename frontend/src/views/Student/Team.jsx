import React, { useState, useEffect } from 'react';
import { readClasses } from '../../api/Classes';

export const Student_TeamSection = () => {

    return (
        <div className="container-md">
            <div className="container-md d-flex flex-column gap-3 mt-5 pr-3 pl-3">
                <div className="d-flex flex-row justify-content-between">
                    <h4 className="fw-bold">Teams</h4>
                    <div>
                        <button
                        className="btn btn-secondary btn-block fw-bold bw-3"
                        >
                        Add Team
                        </button>
                    </div>
                </div>
                <hr className="text-dark" />
            </div>
        </div>
    );
};